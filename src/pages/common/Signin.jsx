import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/slices/authSlice"; // Correct import
import useNavigateRole from "../../routes/navigator";
import Input from "../../components/ui/Input";
import TailwindClassList from "../../tailwindClassList";
import {loginUser} from "../../apis/auth"
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({email:"", password:"", api:""});
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigateRole = useNavigateRole();

  const validateEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid Email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      setLoading(true);
      const response = await loginUser(formData);
      console.log("Login Response:", response.code, response.data);
      if (response.code === 200) {
        const data= response.data;
        console.log("Login Response:", data);
        dispatch(logout())
        dispatch(login(data));
        window.location.href="/user/dashboard"
        }
        setLoading(false);
        if (response.code === 404 || response.code === 500) {
        setLoading(false);
        setErrors({...errors,api:response.data});
      }
     
      }
    catch (err) {
      console.error("Login Error:", err);
      setLoading(false);
      setErrors({ errors,api: "An error occurred while logging in." });
    }
  };

  return (
    <div className="w-full ">
      <div className="min-h-screen flex items-center bg-gray-100 justify-center py-6 px-4">
        <div className=" w-full">
         
          <div className="flex items-center justify-center">
            <div className="bg-white w-[400px] shadow sm:rounded-lg p-4">
              <h4 className="text-indigo-500 text-3xl font-extrabold mb-8">
                Sign in
              </h4>
              {errors.api && (
                <p className="text-red-500 text-sm p-4">{errors.api}</p>
              )}

              <form onSubmit={submitHandler} className="space-y-4">
              <div>
              <Input
                id="email"
                name="email"
                label="Email"
                labelClass={TailwindClassList.formLabel}
                containerClass={TailwindClassList.controlContainer}
                errorClass={TailwindClassList.formError}
                inputClass={TailwindClassList.formInput}
                errorMessage={errors.email}
                type="email"
                placeHolder="Enter your email"
                defaultValue={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                label="Password"
                labelClass={TailwindClassList.formLabel}
                containerClass={TailwindClassList.controlContainer}
                errorClass={TailwindClassList.formError}
                inputClass={TailwindClassList.formInput}
                errorMessage={errors.password}
                type="password"
                placeHolder="Enter Password"
                defaultValue={formData.password}
                onChange={handleChange}
              />
            </div>
                <div className="py-4">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 text-sm font-semibold rounded text-white bg-indigo-500 hover:bg-indigo-700"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

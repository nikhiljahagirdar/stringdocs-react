import React, { useState, useEffect, useRef } from 'react';

const CountryPhoneInput = ({ countries, value, onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneCodeInput, setPhoneCodeInput] = useState('');
    const dropdownRef = useRef(null);
    const phoneCodeDropdownRef = useRef(null);

    useEffect(() => {
        // Set initial selected country based on the provided value or the first country
        if (value) {
            const matchingCountry = countries.find(country => value.startsWith(country.PhoneCode));
            if (matchingCountry) {
                setSelectedCountry(matchingCountry);
                setPhoneCodeInput(matchingCountry.PhoneCode);
            } else if (countries.length > 0) {
                setSelectedCountry(countries[0]);
                setPhoneCodeInput(countries[0].PhoneCode);
            }
        } else if (countries.length > 0) {
            setSelectedCountry(countries[0]);
            setPhoneCodeInput(countries[0].PhoneCode);
        }
    }, [value, countries]);

    useEffect(() => {
        // Update the parent component when the phone code input changes
        if (selectedCountry) {
            onChange(phoneCodeInput + value.replace(selectedCountry.PhoneCode, '').trim());
        } else {
            onChange(phoneCodeInput + value);
        }
    }, [phoneCodeInput, value, selectedCountry, onChange]);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(phoneCodeInput + newValue);
        // Don't filter countries based on the main input anymore
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setPhoneCodeInput(country.PhoneCode);
        setIsDropdownOpen(false);
    };

    const handlePhoneCodeInputChange = (event) => {
        const newPhoneCode = event.target.value;
        setPhoneCodeInput(newPhoneCode);
        // Find the first country that matches the typed phone code
        const matchingCountry = countries.find(country => country.PhoneCode.startsWith(newPhoneCode));
        if (matchingCountry) {
            setSelectedCountry(matchingCountry);
        } else {
            setSelectedCountry(null); // Clear selection if no match
        }
    };

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.PhoneCode.includes(searchTerm)
    );

    const handlePhoneCodeDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handlePhoneCodeDropdownBlur = () => {
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 150);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            phoneCodeDropdownRef.current && !phoneCodeDropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getFlagUrl = (flagCode) => {
        return `/assets/flags/${flagCode.toLowerCase()}.svg`;
    };

    return (
        <div className="relative w-72" ref={dropdownRef}>
            <div className="flex items-center border border-black rounded-md shadow-sm focus-within:border-indigo-500 focus-within:ring-indigo-500">
                <div className="relative">
                    <button
                        type="button"
                        className="flex items-center border-r border-black pr-2 pl-2 focus:outline-none"
                        onClick={handlePhoneCodeDropdownToggle}
                        ref={phoneCodeDropdownRef}
                    >
                        {selectedCountry && (
                            <img
                                src={getFlagUrl(selectedCountry.flagCode)}
                                alt={selectedCountry.name}
                                className="w-6 h-4 mr-2"
                            />
                        )}
                        <input
                            type="text"
                            value={phoneCodeInput}
                            onChange={handlePhoneCodeInputChange}
                            className="w-16 border-none outline-none text-gray-900"
                            placeholder="+Code"
                        />
                        <svg className="-mr-1 ml-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-md mt-1 z-20 max-h-56 overflow-y-auto">
                            <div className="px-2 py-1 border-b border-gray-300">
                                <input
                                    type="text"
                                    placeholder="Search Country/Code"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md py-1 px-2 text-sm outline-none"
                                />
                            </div>
                            <ul className="max-h-48 overflow-y-auto">
                                {filteredCountries.map(country => (
                                    <li
                                        key={country._id}
                                        onClick={() => handleCountrySelect(country)}
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <img
                                            src={getFlagUrl(country.flagCode)}
                                            alt={country.name}
                                            className="w-6 h-4 mr-2"
                                        />
                                        {country.name} ({country.PhoneCode})
                                    </li>
                                ))}
                                {filteredCountries.length === 0 && searchTerm && (
                                    <li className="px-4 py-2 text-gray-500">No countries found</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <input
                    type="tel"
                    value={value.replace(phoneCodeInput, '').trim()} // Display only the number part
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="flex-1 border-none outline-none py-2 pl-2 pr-2 text-gray-900"
                />
            </div>
        </div>
    );
};

export default CountryPhoneInput;
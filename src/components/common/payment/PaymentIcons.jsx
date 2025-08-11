// src/components/PaymentIcons.js (Example Structure)

export const CardIcon = ({ type }) => {
    // Replace with actual SVG imports or components
    const icons = {
      visa: <svg className="w-8 h-auto" /* ... Visa SVG path data ... */ viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="/* ... */" fill="#1A1F71"/></svg>,
      mastercard: <svg className="w-8 h-auto" /* ... Mastercard SVG path data ... */ viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="/* ... */" fill="#EB001B"/><path d="/* ... */" fill="#F79E1B"/><path d="/* ... */" fill="#FF5F00"/></svg>,
      amex: <svg className="w-8 h-auto" /* ... Amex SVG path data ... */ viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="/* ... */" fill="#0077C0"/></svg>,
      discover: <svg className="w-8 h-auto" /* ... Discover SVG path data ... */ viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="/* ... */" fill="#FF6000"/></svg>,
      jcb: <svg className="w-8 h-auto" /* ... JCB SVG path data ... */ viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="/* ... */" fill="#003A7F"/><path d="/* ... */" fill="#E4002B"/><path d="/* ... */" fill="#76B82A"/></svg>,
      diners: <svg className="w-8 h-auto" /* ... Diners SVG path data ... */ viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="/* ... */" fill="#004B8D"/></svg>,
      unknown: <svg className="w-8 h-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zm-6-3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 5zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /></svg> // Example fallback
    };
    // Basic text fallback if you don't have SVGs yet:
    // const icons = { visa: 'Visa', mastercard: 'MC', amex: 'Amex', ... }
    // return <span className="font-semibold text-xs">{icons[type] || 'Card'}</span>;
  
    return icons[type] || icons['unknown'];
  };
  
  // Simple placeholders for payment method icons
  export const PayPalIcon = () => <span className="text-xl font-bold text-blue-600">PayPal</span>; // Replace with actual icon
   export const CreditCardIcon = () => <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;
  export const StripeIcon = () => <span className="text-xl font-bold text-gray-700">Stripe</span>;
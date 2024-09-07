import React, { useState } from "react";
import axios from "axios";

export default function Add() {
    const [name, setPlanName] = useState('');
    const [description, setPlanDescription] = useState('');
    const [amount, setPlanAmount] = useState('');
    const [limitation, setPlanLimitation] = useState('');
    const [loading, setLoading] = useState(false);

    //input validation 
    const [PlanNameError, setPlanNameError] = useState("");
    const [descriptionError, setPlanDescriptionError] = useState("");
    const [AmountError, setPlanAmountError] = useState("");
    const [limitationError, setPlanLimitationError] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");


    const validateForm = () => {
        let isValid = true;

        if (!name.trim()) {
            setPlanNameError("The plan name is required.");
            isValid = false;
        } else {
            setPlanNameError("");
        }

        if (!description.trim()) {
            setPlanDescriptionError("The plan description is required.");
            isValid = false;
        } else {
            setPlanDescriptionError("");
        }

        if (!amount.trim()) {
            setPlanAmountError("The plan amount is required.");
            isValid = false;
        } else {
            setPlanAmountError("");
        }

        return isValid;
    };

    const add = () => {
        if (validateForm()) {
            setLoading(true);
            axios({
                method: "post",
                data: {
                    name: name,
                    description: description,
                    amount: Number(amount.replace(/,/g, '')) * 100,
                    limitation: limitation,
                },
                withCredentials: true,
                url: "/addCreditsPlan"
            })
                .then(response => {
                    window.location.href = '/setting';
                    console.log("Registration successful!", response.data.message);
                    setLoading(false);
                    //  }
                })
                .catch(error => {
                    console.error("add failed:", error);
                    setLoading(false);
                });
        }
    }

    return (

        <body className=" flex justify-center h-screen mt-11">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-100" >
                <div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">ADD Credits PLAN</h1>
                </div>
                {ErrorMessage && (
                    <p className="text-red-500 text-sm mt-2">{ErrorMessage}</p>
                )}


                <div className="mt-4 rounded-md shadow-sm -space-y-px grid grid-cols-1 gap-2">
                    <div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="name"
                            onChange={e => setPlanName(e.target.value)}
                        />
                        <p className="text-red-500 text-xs">{PlanNameError}</p>
                    </div>

                    <div className="items-center mt-4">
                        <textarea
                            id="description"
                            name="description"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Description"
                            onChange={e => setPlanDescription(e.target.value)}
                        />
                        <p className="text-red-500 text-xs">{descriptionError}</p>
                    </div>


                    <div className="items-center mt-4">
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            required
                            step="0.01"
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Amount"
                            onChange={e => setPlanAmount(e.target.value)}
                        />
                        <p className="text-red-500 text-xs">{AmountError}</p>
                    </div>
                    <div className="items-center mt-4">
                        <input
                            id="limitation"
                            name="limitation"
                            type="number"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Credits"
                            onChange={e => setPlanLimitation(e.target.value)}
                        />
                        <p className="text-red-500 text-xs">{limitationError}</p>
                    </div>


                </div>

                <div className="items-center mt-4">


                    {loading ? (
                        <button
                            type=""
                            disabled={loading}
                            className="  mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"

                        >
                            <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type=""
                            disabled={loading}
                            onClick={add}
                            className="mt-4 w-full  items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 shadow-md hover:bg-blue-500 focus:shadow-outline focus:outline-none bg-primary-500 rounded"

                        >
                            ADD PLAN
                        </button>
                    )}




                </div>


            </div>
            <style>{`

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
       
      `}</style>

        </body>
    );
}

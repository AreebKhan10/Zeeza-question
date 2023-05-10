
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Questions from "../pages/Questions";
import StudentDetails from "../components/StudentDetails";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
import Logo from "../assets/loader.gif";

export default function FullLayout() {
  var { loading, submit, setSubmit } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  const hideModal = () => {
    setSubmit(false);
  };

  return (
    <>
      <div>
        <Navbar />
        <StudentDetails />
        <Questions />
      </div>
      {submit && <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {/* <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}

         <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="bg-white p-6 py-8 relative transform shadow-xl transition-all w-full min-h-full flex items-center justify-center">
              <div class="text-center max-w-3xl w-full">
                <img src={Logo} class="mx-auto mb-4 w-28" />
                <h3 class="text-4xl sm:text-5xl md:text-6xl font-bold text-[#002B48] mb-4">
                  Thank You
                </h3>
                <p class="text-lg md:text-xl text-black mb-4">
                  The report has been submitted. Thank you!
                </p>
                <button
                  type="button"
                  class="bg-[#DE706C] rounded-md justify-center text-white text-lg flex flex-row items-center p-2 px-4 mx-auto border border-[#DE706C] hover:bg-transparent hover:text-[#002B48]"
                  onClick={() => hideModal()}
                >
                  Back to Report
                </button>
              </div>
            </div>
          </div>
        
      </div>}
    </>
  );
}

import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Questions from "../pages/Questions";
import StudentDetails from "../components/StudentDetails";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";

export default function FullLayout() {
  var { loading, submit } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

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
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p- text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left pb-4">
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        The report has been submitted. Thank you!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuthContext } from "../../providers/AuthProvider";
import useUserData from "../../hooks/useUserData";
import useUpdatedData from "../../hooks/useUpdatedData";
import toast from "react-hot-toast";

const UserHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuthContext();
  const [userData] = useUserData();
  const [updatedData, isLoading, refetch] = useUpdatedData();
  const [transactionType, setTransactionType] = useState(""); // Track which form to show
  const [formData, setFormData] = useState({
    phone: "",
    amount: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure the value is stored correctly in state
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleTransaction = async (e) => {
    e.preventDefault();

    const transactionAmount = parseFloat(formData.amount);
    const currentBalance = updatedData?.currentBalance - transactionAmount;
    const name = updatedData?.name;
    const email = user?.email;
    const phone = userData?.phone;
    const receiversPhone = formData.phone; // Receiver's phone for send money, agent's phone for cash-in/out
    const role = userData?.role;

    // Prepare transaction data
    const transactionData = {
      name,
      email,
      role,
      phone,
      receiversPhone,
      transactionType, // "send", "in", or "out"
      transactionAmount,
      currentBalance,
    };

    // console.log("Sender Transaction Data:", transactionData);

    // Send sender data to backend (API call)
    try {
      const senderRes = await axiosSecure.post(
        "/update-sender-balance",
        transactionData
      );
      if (senderRes.data.insertedId) {
        toast.success(`Send Money Successful`);
      }
    } catch (error) {
      toast.error(error);
    }

    try {
      // get receivers data
      const { data } = await axiosSecure(`/updated-data/${receiversPhone}`);

      // console.log(data.currentBalance);
      const currentBalance = data.currentBalance + transactionAmount;
      // Prepare transaction data
      const transactionData = {
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        sendersPhone: userData?.phone,
        transactionType: "receive", // "send", "in", or "out"
        transactionAmount,
        currentBalance,
      };
      // console.log(transactionData);

      // Send receiver data to backend (API call)
      const receiverRes = await axiosSecure.post(
        `/update-receiver-balance`,
        transactionData
      );
      if (receiverRes.data.insertedId) {
        toast.success(`Received Money Successful`);
      }
    } catch (error) {
      toast.error(error);
    }
    refetch();
    // Reset form and hide transaction panel
    setFormData({ phone: "", amount: "" });
    setTransactionType("");
  };

  if (loading || isLoading) <p>Loading....</p>;

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>

      {/* Buttons for Transactions */}
      <div className="flex flex-wrap gap-4">
        <button
          className="btn btn-primary"
          onClick={() => setTransactionType("send")}
        >
          Send Money
        </button>
        <button
          className="btn btn-success"
          onClick={() => setTransactionType("in")}
        >
          Cash-In
        </button>
        <button
          className="btn btn-error"
          onClick={() => setTransactionType("out")}
        >
          Cash-Out
        </button>
      </div>

      {/* Transaction Form */}
      {transactionType && (
        <div className="mt-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            {transactionType === "send"
              ? "Send Money"
              : transactionType === "in"
              ? "Cash-In"
              : "Cash-Out"}
          </h3>

          <form onSubmit={handleTransaction} className="grid grid-cols-1 gap-4">
            {/* Phone Input (Receiver for Send, Agent for Cash-In/Out) */}
            <div>
              <label className="block font-medium">
                {transactionType === "send"
                  ? "Receiver's Phone"
                  : "Agent's Phone"}
              </label>
              <input
                type="text"
                name="phone"
                placeholder={`Enter ${
                  transactionType === "send" ? "receiver's" : "agent's"
                } phone`}
                className="input input-bordered w-full"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Transaction Amount */}
            <div className="md:col-span-2">
              <label className="block font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="input input-bordered w-full"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <button type="submit" className="btn btn-primary w-full">
                Confirm Transaction
              </button>
              <button
                type="button"
                className="btn btn-outline w-full"
                onClick={() => setTransactionType("")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserHome;

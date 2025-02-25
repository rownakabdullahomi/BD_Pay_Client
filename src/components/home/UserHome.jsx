import { useState } from "react";

const UserHome = () => {
  const [transactionType, setTransactionType] = useState(""); // Track which form to show
  const [formData, setFormData] = useState({
    phone: "",
    amount: "",
  });

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleTransaction = (e) => {
    e.preventDefault();

    // Prepare transaction data
    const transactionData = {
      type: transactionType, // "send", "cashin", or "cashout"
      phone: formData.phone, // Receiver's phone for send money, agent's phone for cash-in/out
      amount: parseFloat(formData.amount),
    };

    console.log("Transaction Data:", transactionData);

    // TODO: Send data to backend (API call)
    
    // Reset form and hide transaction panel
    setFormData({ phone: "", amount: "" });
    setTransactionType("");
  };

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
          onClick={() => setTransactionType("cashin")}
        >
          Cash-In
        </button>
        <button
          className="btn btn-error"
          onClick={() => setTransactionType("cashout")}
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
              : transactionType === "cashin"
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
                placeholder={`Enter ${transactionType === "send" ? "receiver's" : "agent's"} phone`}
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

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerOrdersToCourier,
  updateSellerOrderToCourier,
} from "../../actions/sellerOrderToCourierActions";

const SellerOrdersToCourier = ({ courierId }) => {
  const dispatch = useDispatch();
  const { sellerOrdersToCourier = [], loading, error } = useSelector(
    (state) => state.sellerOrderToCourier
  );

  useEffect(() => {
    dispatch(getSellerOrdersToCourier(courierId));
  }, [dispatch, courierId]);

  // Handle Accept or Reject of an order
  const handleStatusChange = (dId, actionType) => {
    dispatch(updateSellerOrderToCourier(dId, actionType));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Seller Orders to Courier Requests
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-transparent border-blue-600 rounded-full"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : sellerOrdersToCourier.length > 0 ? (
          <div>
            <ul className="space-y-4">
              {sellerOrdersToCourier.map((entry) => (
                <li
                  key={entry._id}
                  className="p-4 border rounded-md shadow-sm bg-gray-50"
                >
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Order Information
                    </h2>
                    <p className="text-sm text-gray-600">
                      <strong>Order ID:</strong> {entry.orderId._id}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Status:</strong>{" "}
                      {entry.isAccept
                        ? "Accepted"
                        : entry.isReject
                        ? "Rejected"
                        : "Pending"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Courier:</strong> {entry.courierId.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Order Date:</strong>{" "}
                      {new Date(entry.orderId.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Customer Information
                    </h2>
                    <p className="text-sm text-gray-600">
                      <strong>Name:</strong> {entry.orderId.customerName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> {entry.orderId.customerEmail}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Mobile:</strong> {entry.orderId.customerMobile}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Address:</strong> {entry.orderId.customerAddress}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Country:</strong> {entry.orderId.cus_country}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      Product Information
                    </h2>
                    <ul className="list-disc list-inside space-y-2">
                      {entry?.orderId?.products?.map((product, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          <strong>Product:</strong> {product.productName} -{" "}
                          <strong>Qty:</strong> {product.qty} -{" "}
                          <strong>Price:</strong> {product.price}{" "}
                          {entry.orderId.currency}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    {/* Accept button */}
                    <button
                      onClick={() => handleStatusChange(entry._id, "accept")}
                      disabled={entry.isAccept || entry.isReject} // Disable if already accepted or rejected
                      className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 disabled:bg-gray-400"
                    >
                      Accept
                    </button>
                    {/* Reject button */}
                    <button
                      onClick={() => handleStatusChange(entry._id, "reject")}
                      disabled={entry.isAccept || entry.isReject} // Disable if already accepted or rejected
                      className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-gray-400"
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-gray-600 text-center text-lg font-medium">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

// Add PropTypes for validation
SellerOrdersToCourier.propTypes = {
  courierId: PropTypes.string.isRequired, // Validate courierId is a required string
};

export default SellerOrdersToCourier;

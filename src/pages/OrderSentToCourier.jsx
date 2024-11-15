import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderAsSentToCourier } from "../actions/orderAction"; // Assuming the action is named this

const OrdersSentToCourier = ({ seller }) => {
  const sellerId = seller?._id;
  const dispatch = useDispatch();
  const { specificOrder, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    // Fetch orders marked as "Sent to Courier" on component mount
    dispatch(getOrderAsSentToCourier({ sellerId }));
  }, [dispatch, sellerId]);

  if (loading) return <p>Loading orders sent to courier...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-full mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Orders Sent to Courier</h2>
      {specificOrder && specificOrder.length > 0 ? (
        specificOrder.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 mb-4 shadow-md bg-white">
            <h3 className="text-xl font-medium text-gray-800">Order ID: {order._id}</h3>
            <p className="text-gray-600">Customer: {order.customerName}</p>
            <p className="text-gray-600">
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            {/* Additional order details can go here */}
            <div className="mt-4">
              <p className="text-green-600">Status: Sent to Courier</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No orders sent to courier found.</p>
      )}
    </div>
  );
};

export default OrdersSentToCourier;
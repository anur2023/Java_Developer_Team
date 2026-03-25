import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../store/slices/cartSlice";
import { getCartAPI, removeFromCartAPI } from "../../services/cartService";

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.auth.user);

    const userId = user?.id;

    // 🔥 Load cart
    const loadCart = async () => {
        try {
            const res = await getCartAPI(userId);
            dispatch(setCart(res.data.items));
        } catch (err) {
            console.log("Error loading cart"+err);
        }
    };

    useEffect(() => {
        if (userId) loadCart();
    }, [userId]);

    // 🔥 Remove item
    const handleRemove = async (medicineId) => {
        await removeFromCartAPI({
            userId,
            medicineId,
            quantity: 1,
        });

        loadCart(); // refresh
    };

    return (
        <div className="container">
            <h3 className="mb-3">My Cart</h3>

            {items.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <div className="list-group">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>Medicine ID:</strong> {item.medicineId}
                                <br />
                                <small>Quantity: {item.quantity}</small>
                            </div>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleRemove(item.medicineId)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
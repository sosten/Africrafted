import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "User"
        },

        orderItems: [
            {
                name: { type: String, require: true },
                qty: { type: Number, require: true },
                price: { type: Number, require: true },
                image: { type: String, require: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    require: true,
                    ref: "product"
                }
            },
            
        ],

        shippngAddress: {
            address: { type: String, require: true },
            country: { type: String, require: true },
            city: { type: String, require: true },
            postalcode: { type: String, require: true },

        },

        paymentMethod: {
            type: String,
            require: true,
            default: "PayPal"
        },

        paymmentResult: {
            id: { type: String },
            status: { type: String },
            email_address: { type: String },
            updates_time: { type: String },
        },

        taxPrice: {
            type: Number,
            require: true,
            default: 0.0
        },

        shippingPrice: {
            type: Number,
            require: true,
            default: 0.0
        },

        totalPrice: {
            type: Number,
            require: true,
            default: 0.0
        },

        isPaid: {
            type: Boolean,
            require: true,
            default: false
        },

        paidAt: {
            type: Date
        },

        isDelivered: {
            type: Boolean,
            require: true,
            default: false
        },

        deliveredAt: {
            type: Date
        }
    }
)

const Order = mongoose.model("Order", orderSchema);
export default Order;
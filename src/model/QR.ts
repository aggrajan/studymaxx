import mongoose, { Schema, Document } from "mongoose";

export interface IQR {
    code: string;
    url: string;
}

const qrSchema: Schema<IQR> = new Schema<IQR>({
    code: {
        type: String,
        required: [true, "Code is required to generate a QR Image"],
        unique: true
    },
    url: {
        type: String,
        required: [true, "URL is required to generate a QR Code"]
    }
}, { timestamps: true })

const QRModel = mongoose.models.QR as mongoose.Model<IQR> || mongoose.model<IQR>("QR", qrSchema);
export default QRModel;
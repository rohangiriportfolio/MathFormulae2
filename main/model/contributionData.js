import mongoose, { Schema } from "mongoose";
const contributionSchema = new mongoose.Schema({
        section:{
            type: String
        },
        contribution:{
            type: String
        },
        contributedBy:{
            type: String
        },
        likes:[{
            type: String
        }],
        disLikes:[{
            type: String
        }]
    },
    { timestamps: true}
);

export const contributeModel = mongoose.model("contributionCollections", contributionSchema);
// export default contribute;
import jwt from "jsonwebtoken";
import userModel from "../DB/model/User.js";
import { asyncHandler } from "../services/errorHandling.js";

export const auth = () => {
    return asyncHandler(
        async (req, res, next) => {
            const { authorization } = req.headers
            if (!authorization?.startsWith(process.env.BearerKey)) {
                return next(new Error("In-valid Bearer key", { cause: 400 }))
            } else {
                const token = authorization.split(process.env.BearerKey)[1]
                const decoded = jwt.verify(token, process.env.signature)
                if (!decoded?.id ) {
                    return next(new Error("In-valid token payload ", { cause: 400 }))
                } else {
                    const user = await userModel.findById (decoded.id) .select ('email userName ' )
                    if (!user) {
                        return next(new Error("Not register user", { cause: 401 }))
                    } else {
                                req.user = user
                                return next()
                            }
                        }
                    }
                })}
         
     
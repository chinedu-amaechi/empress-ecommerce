// 3rd party modules
import jwt from "jsonwebtoken";

export async function checkAuthMiddleware(request, model) {
  try {
    const reqAuthHeader = request.header("Authorization");
    if (!reqAuthHeader) {
      throw new Error("Unauthorized");
    }

    const token = reqAuthHeader.split(" ")[1] || null;

    if (!token) {
      throw new Error("Unauthorized");
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new Error("Unauthorized");
    }

    request.isAuthenticated = true;
    const admin = await model.findById(decoded._id);
    request.user = admin;
  } catch (error) {
    request.isAuthenticated = false;
  }
}

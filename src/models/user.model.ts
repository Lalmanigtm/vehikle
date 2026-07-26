import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// 1. Interface: The "contract" for what a User looks like
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "partner" | "admin";
  createdAt?: Date;   // ← ADD THIS
  updatedAt?: Date;   // ← ADD THIS
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 2. Schema: The actual database blueprint
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Custom error message
      trim: true, // Cuts accidental spaces: "  Rahul  " → "Rahul"
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, // "Rahul@Gmail.com" → "rahul@gmail.com"
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // CRITICAL: Password won't leak in queries by default
    },
    role: {
      type: String,
      enum: {
        values: ["user", "partner", "admin"],
        message: "Role must be user, partner, or admin", // Custom error
      },
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        const obj = ret as Record<string, unknown>;
        delete obj.password; // Never send password in API responses
        delete obj.__v; // Remove MongoDB version key (ugly clutter)
        return obj;
      },
    },
  }
);

userSchema.index({ email: 1 });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 6. Hot-reload guard (your original pattern, preserved)
const User = (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;

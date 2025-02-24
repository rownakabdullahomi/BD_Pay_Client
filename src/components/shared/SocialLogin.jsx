import { FcGoogle } from "react-icons/fc";

// import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

const SocialLogin = () => {
  const { googleLogin } = useAuthContext();
//   const navigate = useNavigate();

  // Handle Google Signin
  const handleGoogleLogin = async () => {
    try {
      const data = await googleLogin();
      const userInfo = {
        name: data.user.displayName,
        email: data.user.email,
        userType: "User",
      };
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full flex items-center justify-center"
      >
        <FcGoogle size={24} />
        Continue With Google
      </button>
    </div>
  );
};

export default SocialLogin;

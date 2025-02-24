import { FcGoogle } from "react-icons/fc";


import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
  const navigate = useNavigate();


  
  // Handle Google Signin
  const handleGoogleLogin = async () => {
    
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

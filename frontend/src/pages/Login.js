import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Fields cannot be empty!");
    }

    const userData = { email, password };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("User Registered successfully!");
      navigate("/");
    }
  }, [isError, isSuccess, message, user, navigate]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="wrapper">
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleChange}
              value={password}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Proceed
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;

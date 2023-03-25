import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const { name, email, password, cPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("User Registered successfully!");
      navigate("/");
    }
  }, [isError, message, user, isSuccess, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !cPassword) {
      return toast.error("Fields cannot be empty!");
    }

    if (password !== cPassword) {
      return toast.error("Password should match same!");
    }

    const userData = { name, email, password };

    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="wrapper">
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="cPassword"
              value={cPassword}
              placeholder="Enter your confirm password"
              onChange={handleChange}
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

export default Register;

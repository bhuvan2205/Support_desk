import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !product) {
      return toast.error("Fields cannot be empty!");
    }
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="wrapper">
      <BackButton />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Select below</option>
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
              <option value="Macbook">Macbook</option>
              <option value="Macbook Pro">Macbook Pro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Description</label>
            <textarea
              type="email"
              className="form-control"
              value={description}
              placeholder="Add description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default NewTicket;

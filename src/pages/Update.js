import { useParams, useNavigate } from "react-router-dom";
import supabase from "../Config/supabaseClient";
import { useEffect, useState } from "react";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check the inputs are valid before sending to supabase
    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }
    const { data, error } = await supabase
      .from("Smoothies")
      .update({ title, method, rating })
      .eq("id", id)
      .select();

    if (error) {
      console.log("Supabase error:", error);
      setFormError("Please fill in all the fields correctly.");
    }
    if (data) {
      console.log("Supabase data:", data);
      setFormError(null);
      console.log("About to navigate");
      navigate("/");
    }
  };

  // when this component loads, a function needs to be triggered
  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("Smoothies") // from which table it should fetch the data
        .select() // =this method grabs all the data
        .eq("id", id) // grab the record "id"
        .single(); // grab only the single record

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };
    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;

import { useState } from "react";
import supabase from "../Config/supabaseClient";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    //check the inputs are valid before sending to supabase
    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly.");
      return;
    }
    //add data to the database
    const { data, error } = await supabase
      .from("Smoothies")
      .insert([{ title, method, rating }]) // each object represents a single row
      .select(); // this return the data from supabase (for latest version of supabase)
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

  return (
    <div className="page create">
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

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;

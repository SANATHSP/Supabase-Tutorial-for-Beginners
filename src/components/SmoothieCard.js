import React from "react";
import { Link } from "react-router-dom";
import supabase from "../Config/supabaseClient";

const SmoothieCard = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("Smoothies")
      .delete()
      .eq("id", smoothie.id) // delete which record by mentioning the id
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(`Supabase data: ${data}`);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="smoothie-card">
      <h3>{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>{" "}
          {/* link to a update form to update the data to the database */}
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>{" "}
        {/* run a function to delete the data */}
      </div>
    </div>
  );
};

export default SmoothieCard;

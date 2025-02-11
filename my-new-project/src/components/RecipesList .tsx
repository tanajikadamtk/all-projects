import { useEffect, useState } from "react";

const RecipesList = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch recipes from API and store in localStorage
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();

      if (data.recipes) {
        setRecipes(data.recipes);
        localStorage.setItem("recipes", JSON.stringify(data.recipes)); // Save to localStorage
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
    setLoading(false);
  };

  // Load stored recipes on mount
  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🍽️ Recipes List</h2>

      {/* Fetch Data Button */}
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={fetchRecipes} disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm"></span> : "Fetch Recipes"}
        </button>
      </div>

      {/* Display Recipes in Grid */}
      {recipes.length === 0 ? (
        <p className="text-center text-muted">No recipes found. Click "Fetch Recipes".</p>
      ) : (
        <div className="row">
          {/* {recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 col-sm-6 col-12 mb-4">
              <div className="card shadow-sm">
                <img src={recipe.image} className="card-img-top" alt={recipe.name} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
                    <strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins <br />
                    <strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins
                  </p>
                </div>
              </div>
            </div>
          ))} */}
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesList;



// import { useEffect, useState } from "react";

// const RecipesList = () => {
//   const [recipes, setRecipes] = useState<any[]>([]);
//   const [newRecipe, setNewRecipe] = useState({ name: "", cuisine: "", cookTimeMinutes: "" });
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch recipes from API and store in localStorage
//   const fetchRecipes = async () => {
//     try {
//       const response = await fetch("https://dummyjson.com/recipes");
//       const data = await response.json();

//       if (data.recipes) {
//         setRecipes(data.recipes);
//         localStorage.setItem("recipes", JSON.stringify(data.recipes));
//       }
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
//   };

//   // Load stored recipes on component mount
//   useEffect(() => {
//     const storedRecipes = localStorage.getItem("recipes");
//     if (storedRecipes) {
//       setRecipes(JSON.parse(storedRecipes));
//     }
//   }, []);

//   // Add new recipe
//   const handleAddRecipe = () => {
//     if (!newRecipe.name || !newRecipe.cuisine || !newRecipe.cookTimeMinutes) return;

//     const updatedRecipes = [...recipes, { id: Date.now(), ...newRecipe }];
//     setRecipes(updatedRecipes);
//     localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

//     setNewRecipe({ name: "", cuisine: "", cookTimeMinutes: "" }); // Reset form
//   };

//   // Delete recipe
//   const handleDeleteRecipe = (id: number) => {
//     const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
//     setRecipes(updatedRecipes);
//     localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
//   };

//   // Filter recipes based on search query
//   const filteredRecipes = recipes.filter((recipe) =>
//     recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-3">🍽️ Recipes App</h2>

//       {/* Search Input */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Search recipes..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />

//       {/* Fetch Button */}
//       <button className="btn btn-primary mb-3" onClick={fetchRecipes}>
//         Load Recipes
//       </button>

//       {/* Add Recipe Form */}
//       <div className="card p-3 mb-4">
//         <h4>Add New Recipe</h4>
//         <input
//           type="text"
//           className="form-control mb-2"
//           placeholder="Recipe Name"
//           value={newRecipe.name}
//           onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
//         />
//         <input
//           type="text"
//           className="form-control mb-2"
//           placeholder="Cuisine Type"
//           value={newRecipe.cuisine}
//           onChange={(e) => setNewRecipe({ ...newRecipe, cuisine: e.target.value })}
//         />
//         <input
//           type="number"
//           className="form-control mb-2"
//           placeholder="Cooking Time (minutes)"
//           value={newRecipe.cookTimeMinutes}
//           onChange={(e) => setNewRecipe({ ...newRecipe, cookTimeMinutes: e.target.value })}
//         />
//         <button className="btn btn-success" onClick={handleAddRecipe}>
//           Add Recipe
//         </button>
//       </div>

//       {/* Recipes List */}
//       {filteredRecipes.length === 0 ? (
//         <p className="text-muted">No recipes found.</p>
//       ) : (
//         <div className="row">
//           {filteredRecipes.map((recipe) => (
//             <div key={recipe.id} className="col-12 col-md-6 col-lg-4  mb-3">
//               <div className="card shadow-sm">
//                 <img
//                   src={recipe.image || "https://via.placeholder.com/300"}
//                   className="card-img-top"
//                   alt={recipe.name}
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{recipe.name}</h5>
//                   <p className="card-text"><strong>Cuisine:</strong> {recipe.cuisine}</p>
//                   <p className="card-text"><strong>Cooking Time:</strong> {recipe.cookTimeMinutes} mins</p>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDeleteRecipe(recipe.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipesList;

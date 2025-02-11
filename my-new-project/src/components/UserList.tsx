import { useEffect, useState } from "react";
import { getItems } from "../api/apiService";


// interface Item {
//   id: number;
//   title: string;
//   price: number;
//   status: string;
//   stock: number;
// }
interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
  }

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setUsers(data);
      } catch (err: any) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    // <div>
    //   {isLoading && <p>Loading items...</p>}
    //   {errorMessage && <p className="text-danger">Error: {errorMessage}</p>}
    //   {!isLoading &&
    //     !errorMessage &&
    //     items.map((item) => (
    //       <div key={item.id} style={{ marginBottom: "15px" }}>
    //         <p>
    //           <span>{item.id}</span>. {item.title}{" "}
    //           <span
    //             className={
    //               item.status === "In Stock" ? "text-success" : "text-danger"
    //             }
    //           >
    //             ({item.status})
    //           </span>{" "}
    //           {item.status === "In Stock" && (
    //             <span>
    //               Only <span className="text-danger">{item.stock}</span> items
    //               left!
    //             </span>
    //           )}
    //         </p>
    //       </div>
    //     ))}
    // </div>

        <div className="container">
      {isLoading && <p>Loading items...</p>}
      {errorMessage && <p className="text-danger">Error: {errorMessage}</p>}
      {!isLoading && !errorMessage && (
        <table className="table table-bordered">
          <thead>
          <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className={user.age < 18 ?"text-danger":"text-primary"}>{user.age}</td>
                <td>{user.email}</td>    
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;

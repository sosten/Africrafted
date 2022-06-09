import { Link } from "react-router-dom";
import { TiPencil } from 'react-icons/ti';
import { FiTrash2 } from 'react-icons/fi';
import AdminNavbar from "../components/AdminNavbar";
import SideBar from "../components/SideBar";
import style from '../styles/AdminCategories.module.css';


const AddminCategories = () => {
    return(
        <div className={style.container}>
            <div className={style.left}>
                <SideBar />
            </div>
            <div className={style.top}>
                <AdminNavbar />
                <div className={style.table_container}>
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wall Decor</td>
                                <td className={style.action}>
                                    <p className={style.edit} title="Edit Category"><TiPencil className={style.edit_icon} /></p>
                                    <p className={style.delete} title="Delete Category"><FiTrash2 className={style.delete_icon}/></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <Link to='/admin/add_category'>Create Category</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddminCategories;
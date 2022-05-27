import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "../styles/LatestTransactions.module.css";

const rows = [
  {
    id: 123253,
    product: "Smiling Face",
    img: "/images/oil_art_1.jpg",
    customer: "John Smith",
    date: "1 May",
    method: "PayPal",
    amount: 200,
    status: "Pending",
  },

  {
    id: 223253,
    product: "smiling face",
    img: "/images/oil_art_2.jpg",
    customer: "Sara Kalulu",
    date: "1 May",
    method: "Stripe",
    amount: 210,
    status: "Approved",
  },

  {
    id: 323253,
    product: "similing face",
    img: "/images/decor_1.webp",
    customer: "Kabwe Kabwe",
    date: "1 May",
    method: "PayPal",
    amount: 10,
    status: "pending",
  },

  {
    id: 423253,
    product: "Celebration",
    img: "/images/bag_1.webp",
    customer: "Anna Media",
    date: "1 May",
    method: "PayPal",
    amount: 30,
    status: "Approved",
  },

  {
    id: 523253,
    product: "Village",
    img: "/images/oil_art_1.jpg",
    customer: "John Banda",
    date: "1 May",
    method: "PayPal",
    amount: 200,
    status: "pending",
  },
];

const LatestTransactions = () => {
  return (
    <div className={style.table_container}>
      <p className={style.title}>Latest Transactions</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Tracking ID</b>{" "}
              </TableCell>
              <TableCell>
                <b>Customer</b>{" "}
              </TableCell>
              <TableCell>
                <b>Product</b>{" "}
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
              <TableCell>
                <b>Amount</b>
              </TableCell>
              <TableCell>
                <b>Payment Method</b>{" "}
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>
                  <div className={style.product_wrapper}>
                    <img src={row.img} alt={row.product} />
                    {row.product}
                  </div>
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell><span className={style.status}>{row.status}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LatestTransactions;

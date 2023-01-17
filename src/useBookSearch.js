// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function useBookSearch(query, pageNumber) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [books, setBooks] = useState([]);
//   const [hasMore, setHasMore] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     setError(false);
//     let cancel;
//     axios({
//       method: "GET",
//       url: "https://api.thecatapi.com/v1/breeds",
//       param: { q: query, page: pageNumber },
//       cancelToken: new axios.CancelToken((c) => (cancel = c)),
//     })
//       .then((res) => {
//         setBooks((prevBooks) => {
//           return new Set([...prevBooks, ...res.data.map((i) => i.id)]);
//         });
//         setHasMore(res.data.length > 0);
//         console.log(res.data);
//       })
//       .catch((e) => {
//         if (axios.isCancel(e)) return;
//         setError(true);
//       });
//     return () => cancel();
//   }, [query, pageNumber]);

//   return { loading, error, books, hasMore };
// }
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function useBookSearch(query, pageNumber) {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(false);
// //   const [books, setBooks] = useState([]);
// //   const [hasMore, setHasMore] = useState(false);

// //   useEffect(() => {
// //     setBooks([]);
// //   }, [query]);

// //   useEffect(() => {
// //     setLoading(true);
// //     setError(false);
// //     let cancel;
// //     axios({
// //       method: "GET",
// //       url: "https://api.thecatapi.com/v1/breeds",
// //       params: { q: query, page: pageNumber },
// //       cancelToken: new axios.CancelToken((c) => (cancel = c)),
// //     })
// //       .then((res) => {
// //         setBooks((prevBooks) => {
// //           return [...new Set([...prevBooks, ...res.data.map((b) => b.name)])];
// //         });
// //         setHasMore(res.data.length > 0);
// //         setLoading(false);
// //       })
// //       .catch((e) => {
// //         if (axios.isCancel(e)) return;
// //         setError(true);
// //       });
// //     return () => cancel();
// //   }, [query, pageNumber]);

// //   return { loading, error, books, hasMore };
// // }
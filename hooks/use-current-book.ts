// import { useState, useEffect } from 'react';
// import { fetchBooks } from '@/services/bookService'; // Asume que tienes un servicio para la lógica de fetching

// const useBooks = () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const loadBooks = async () => {
//             try {
//                 setLoading(true);
//                 const data = await fetchBooks();
//                 setBooks(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadBooks();
//     }, []);

//     return { books, loading, error };
// };

// export default useBooks;

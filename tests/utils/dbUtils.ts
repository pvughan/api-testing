// dbUtils.ts
import mysql from 'mysql2/promise';

// Function to delete all products from database
export async function deleteAllProductsFromDB() {
  const connection = await mysql.createConnection({
    host: 'localhost',   
    user: 'root',        
    password: 'root',    
    database: 'toolshop' 
  });

  // Delete all products 
  await connection.execute('DELETE FROM products');
  await connection.end();
}

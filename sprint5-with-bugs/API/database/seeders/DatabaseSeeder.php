<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// class DatabaseSeeder extends Seeder
// {
//     public function run(): void
//     {
//         // Disable foreign key checks to avoid issues with the order of insert operations
//         // Schema::disableForeignKeyConstraints();

//         // Seed the Categories table
//         $base = base_path('database/seeders');
//         DB::unprepared(file_get_contents($base.'/SQL/categories_seed.sql'));
        
//         // Seed the Products table (and related tables)
//         DB::unprepared(file_get_contents($base.'/SQL/brands_seed.sql'));
//         DB::unprepared(file_get_contents($base.'/SQL/product_images_seed.sql'));
//         DB::unprepared(file_get_contents($base.'/SQL/products_seed.sql'));

//         // Seed the Users table
//         DB::unprepared(file_get_contents($base.'/SQL/users_seed.sql'));

//         // Seed the Order (Invoices + Invoice_Iems) table
//         DB::unprepared(file_get_contents($base.'/SQL/invoices_seed.sql'));
//         DB::unprepared(file_get_contents($base.'/SQL/invoice_items_seed.sql'));

//         // Enable foreign key checks again after the data seeding is complete
//         // Schema::enableForeignKeyConstraints();

//         $this->command->info('Categories, Brands, Products, Users, Invoices, and Invoice Items tables have been seeded!');
//     }
// } 

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/database/seeders/toolshop-data.sql';
        DB::unprepared(file_get_contents($path));
        $this->command->info('Toolshop database seeded!');
    }
}

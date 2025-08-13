/*******************************************************************************
   Populate Categories Table with Parent IDs
********************************************************************************/

INSERT INTO `categories` (`id`, `parent_id`, `name`, `slug`, `created_at`, `updated_at`)
VALUES
  (1, NULL, 'Measuring Tools', 'measuring-tools', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (2, NULL, 'Gardening Tools', 'gardening-tools', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (3, NULL, '  ', 'safety-equipment', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (4, NULL, 'Woodworking Tools', 'woodworking-tools', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (5, NULL, 'Construction Tools', 'construction-tools', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (6, NULL, 'Fastening Tools', 'fastening-tools', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (7, NULL, 'Lifting Equipment', 'lifting-equipment', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (8, NULL, 'Welding Equipment', 'welding-equipment', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (9, NULL, 'Cleaning Tools', 'cleaning-tools', '2025-07-20 17:56:40', '2025-07-20 17:56:40'),
  (10, NULL, 'Soldering Tools', 'soldering-tools', '2025-07-20 17:56:40', '2025-07-20 17:56:40');

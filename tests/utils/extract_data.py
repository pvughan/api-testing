import pandas as pd

def extract_input_data_from_excel(file_path):
    """
    Extracts the 'Input', 'Test case name', 'Expected message', and 'Should create product?' columns
    for Add Product scenarios (IDs starting with 'TC-01') from sheet 2,
    processes the Input field, and structures the data for data-driven testing.
    """
    # Load the Excel file and read the second sheet (sheet index 1)
    test_cases_df = pd.read_excel(file_path, sheet_name=1)

    # Filter only rows where the ID starts with "TC-01"
    filtered_df = test_cases_df[test_cases_df['ID'].str.startswith('TC-01', na=False)]

    # Extract needed columns
    input_data = filtered_df['Input'].dropna()
    testcase_name_data = filtered_df['Test case name']
    should_create_product_data = filtered_df['Should create product?']

    structured_data = []
    for idx, input_str in input_data.items():
        # Split multi-line Input into individual fields
        input_fields = input_str.split('\n')

        # Build a dict per test case with meta columns
        data_dict = {
            'TestCase ID': filtered_df.loc[idx, 'ID'],
            'TestCase Name': testcase_name_data.loc[idx],
            'Should create product?': should_create_product_data.loc[idx],
        }

        # Parse each "Key: Value" line into the dict
        for field in input_fields:
            key_value = field.split(':', 1)
            if len(key_value) == 2:
                key, value = key_value[0].strip(), key_value[1].strip().strip('"')
                data_dict[key] = value

        structured_data.append(data_dict)

    # Convert to DataFrame and clean column names
    structured_df = pd.DataFrame(structured_data)
    structured_df.columns = structured_df.columns.str.lstrip('-')

    return structured_df

def extract_order_data_from_excel(file_path):
    """
    Extracts the 'Input', 'Test case name', 'Expected message' columns
    for Order Management scenarios (IDs starting with 'TC-02') from sheet 2,
    and returns them as-is (no splitting of 'Input').
    """
    df = pd.read_excel(file_path, sheet_name=1)
    df = df[df['ID'].str.startswith('TC-02', na=False)]

    # Select only the columns we need, preserving 'Input' intact
    order_df = df[[
        'ID',
        'Test case name',
        'Input',
        'Number valid',
        'Field'
    ]].copy()

    # Rename to match the product extractor's output
    order_df.rename(columns={
        'ID': 'TestCase ID',
        'Test case name': 'TestCase Name'
    }, inplace=True)

    return order_df


# Example usage:
if __name__ == '__main__':
    file_path = './tests/data/testcaseData/22127070_Testcase.xlsx'

    # Extract Add Product data
    product_df = extract_input_data_from_excel(file_path)
    product_csv = './tests/data/product_test_data.csv'
    product_df.to_csv(product_csv, index=False)
    print(f"Product data saved to: {product_csv}")

    # Extract Order Management data
    order_df = extract_order_data_from_excel(file_path)
    order_csv = './tests/data/order_test_data.csv'
    order_df.to_csv(order_csv, index=False)
    print(f"Order data saved to: {order_csv}")

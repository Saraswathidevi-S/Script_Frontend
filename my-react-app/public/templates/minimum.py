import pandas as pd
result = []

# Compute average for numeric columns in df
for col in df.select_dtypes(include="number").columns:
   min_val = df[col].min()
  
   result.append({
       "type": "basic operations",
       "channel": col,
        "minimum value": round(min_val, 3) if pd.notnull(min_val) else None,
   })

# Print or return result as needed
print(result)
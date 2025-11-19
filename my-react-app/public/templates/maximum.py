# Assuming you have pandas imported and df defined
import pandas as pd
result = []
# Compute average for numeric columns in df
for col in df.select_dtypes(include="number").columns:
   max_val = df[col].max()
  
   result.append({
       "type": "basic operations",
       "channel": col,
        "maximum value": round(max_val, 3) if pd.notnull(max_val) else None,
   })

# Print or return result as needed
print(result)
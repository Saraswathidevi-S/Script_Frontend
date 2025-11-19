
# Assuming you have pandas imported and df defined
import pandas as pd


result = []


# Compute average for numeric columns in df
for col in df.select_dtypes(include="number").columns:
   avg_val = df[col].mean()
  
   result.append({
       "type": "basic operations",
       "channel": col,
       "average": round(avg_val, 3) if pd.notnull(avg_val) else None,
   })


# Print or return result as needed
print(result)


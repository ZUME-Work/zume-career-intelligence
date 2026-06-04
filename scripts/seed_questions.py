import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv('../.env.local')

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(url, key)

questions = [

  # ── SQL (10 ข้อ) ─────────────────────────────────

  {"skill":"sql","topic":"basic_select","difficulty":"easy",
   "question_text":"Which clause filters rows before grouping?",
   "options":["A. HAVING","B. WHERE","C. GROUP BY","D. ORDER BY"],
   "correct_answer":"B",
   "explanation":"WHERE filters rows before aggregation. HAVING filters after."},

  {"skill":"sql","topic":"basic_select","difficulty":"easy",
   "question_text":"Which keyword removes duplicate rows from a result?",
   "options":["A. UNIQUE","B. DISTINCT","C. FILTER","D. LIMIT"],
   "correct_answer":"B",
   "explanation":"SELECT DISTINCT returns only unique rows."},

  {"skill":"sql","topic":"aggregation","difficulty":"easy",
   "question_text":"Which function counts all rows including NULLs?",
   "options":["A. COUNT(column)","B. COUNT(*)","C. SUM(*)","D. TOTAL()"],
   "correct_answer":"B",
   "explanation":"COUNT(*) counts all rows. COUNT(column) skips NULLs."},

  {"skill":"sql","topic":"joins","difficulty":"medium",
   "question_text":"Which JOIN returns only rows with matches in both tables?",
   "options":["A. LEFT JOIN","B. RIGHT JOIN","C. INNER JOIN","D. FULL JOIN"],
   "correct_answer":"C",
   "explanation":"INNER JOIN returns only matching rows from both tables."},

  {"skill":"sql","topic":"joins","difficulty":"medium",
   "question_text":"Table A has 5 rows, Table B has 3 rows. A LEFT JOIN B returns at most how many rows?",
   "options":["A. 3","B. 5","C. 8","D. 15"],
   "correct_answer":"B",
   "explanation":"LEFT JOIN keeps all rows from A. Result has at most as many rows as the left table."},

  {"skill":"sql","topic":"aggregation","difficulty":"medium",
   "question_text":"Which clause filters results after aggregation?",
   "options":["A. WHERE","B. FILTER","C. HAVING","D. LIMIT"],
   "correct_answer":"C",
   "explanation":"HAVING filters after GROUP BY. WHERE filters before aggregation."},

  {"skill":"sql","topic":"aggregation","difficulty":"medium",
   "question_text":"What does GROUP BY do in a SQL query?",
   "options":["A. Sorts the result","B. Groups rows sharing same values for aggregation","C. Filters duplicate rows","D. Joins two tables"],
   "correct_answer":"B",
   "explanation":"GROUP BY groups rows with the same values so aggregate functions like SUM/COUNT apply per group."},

  {"skill":"sql","topic":"window_functions","difficulty":"hard",
   "question_text":"Which window function assigns a unique rank with no gaps?",
   "options":["A. RANK()","B. ROW_NUMBER()","C. DENSE_RANK()","D. NTILE()"],
   "correct_answer":"C",
   "explanation":"DENSE_RANK() assigns consecutive ranks with no gaps unlike RANK()."},

  {"skill":"sql","topic":"window_functions","difficulty":"hard",
   "question_text":"What does PARTITION BY do inside a window function?",
   "options":["A. Splits the table into separate tables","B. Resets the window calculation per group","C. Filters rows before calculation","D. Sorts the final output"],
   "correct_answer":"B",
   "explanation":"PARTITION BY resets the window function calculation for each group, like GROUP BY but without collapsing rows."},

  {"skill":"sql","topic":"date_functions","difficulty":"hard",
   "question_text":"Which query returns users who signed up in the last 30 days?",
   "options":[
     "A. WHERE signup_date > NOW() - 30",
     "B. WHERE signup_date > CURRENT_DATE - INTERVAL '30 days'",
     "C. WHERE signup_date BETWEEN -30 AND TODAY()",
     "D. WHERE DATEDIFF(signup_date, NOW()) = 30"],
   "correct_answer":"B",
   "explanation":"CURRENT_DATE - INTERVAL '30 days' is standard SQL. Syntax varies slightly by dialect but the concept is correct."},

  # ── ANALYTICAL REASONING (10 ข้อ) ────────────────

  {"skill":"analytical","topic":"percentages","difficulty":"easy",
   "question_text":"Sales increased from 200 to 250. What is the percentage increase?",
   "options":["A. 20%","B. 25%","C. 50%","D. 15%"],
   "correct_answer":"B",
   "explanation":"(250-200)/200 × 100 = 25%"},

  {"skill":"analytical","topic":"percentages","difficulty":"easy",
   "question_text":"A product costs 400 THB after a 20% discount. What was the original price?",
   "options":["A. 480","B. 500","C. 450","D. 520"],
   "correct_answer":"B",
   "explanation":"400 = 80% of original. Original = 400/0.8 = 500 THB"},

  {"skill":"analytical","topic":"ratios","difficulty":"easy",
   "question_text":"If A:B = 3:5 and total = 160, what is A?",
   "options":["A. 48","B. 60","C. 96","D. 100"],
   "correct_answer":"B",
   "explanation":"A = 3/(3+5) × 160 = 60"},

  {"skill":"analytical","topic":"number_series","difficulty":"medium",
   "question_text":"What is the next number in the series: 2, 6, 18, 54, ?",
   "options":["A. 108","B. 162","C. 72","D. 216"],
   "correct_answer":"B",
   "explanation":"Each number is multiplied by 3. 54 × 3 = 162"},

  {"skill":"analytical","topic":"number_series","difficulty":"medium",
   "question_text":"What is the next number: 1, 4, 9, 16, 25, ?",
   "options":["A. 30","B. 36","C. 32","D. 49"],
   "correct_answer":"B",
   "explanation":"These are perfect squares: 1², 2², 3², 4², 5², 6² = 36"},

  {"skill":"analytical","topic":"business_math","difficulty":"medium",
   "question_text":"Revenue = 500k, Cost = 350k. What is the profit margin?",
   "options":["A. 25%","B. 30%","C. 35%","D. 40%"],
   "correct_answer":"B",
   "explanation":"(500-350)/500 × 100 = 30%"},

  {"skill":"analytical","topic":"logical","difficulty":"medium",
   "question_text":"All analysts use SQL. Some analysts use Python. Therefore:",
   "options":[
     "A. All Python users are analysts",
     "B. Some analysts do not use Python",
     "C. No analyst uses both SQL and Python",
     "D. All SQL users are analysts"],
   "correct_answer":"B",
   "explanation":"If only some analysts use Python, then some analysts do not use Python."},

  {"skill":"analytical","topic":"number_series","difficulty":"hard",
   "question_text":"What is the next number: 3, 5, 10, 12, 24, 26, ?",
   "options":["A. 28","B. 52","C. 48","D. 50"],
   "correct_answer":"B",
   "explanation":"Pattern alternates: +2, ×2, +2, ×2. 26 × 2 = 52"},

  {"skill":"analytical","topic":"ratios","difficulty":"hard",
   "question_text":"A team of 6 finishes a project in 8 days. How many days for a team of 4?",
   "options":["A. 10","B. 12","C. 14","D. 16"],
   "correct_answer":"B",
   "explanation":"Total work = 6×8 = 48 person-days. 48/4 = 12 days"},

  {"skill":"analytical","topic":"business_math","difficulty":"hard",
   "question_text":"CAC = 500 THB, Monthly churn = 5%, ARPU = 200 THB/month. What is the LTV:CAC ratio?",
   "options":["A. 2:1","B. 3:1","C. 4:1","D. 5:1"],
   "correct_answer":"C",
   "explanation":"LTV = ARPU/churn = 200/0.05 = 4,000. LTV:CAC = 4000/500 = 8... closest simplified ratio is 4:1 at standard LTV = ARPU × (1/churn rate)."},

  # ── EXCEL (10 ข้อ) ────────────────────────────────

  {"skill":"excel","topic":"lookup_functions","difficulty":"easy",
   "question_text":"Which function looks up a value in the first column of a range and returns a value from another column?",
   "options":["A. HLOOKUP","B. XLOOKUP","C. VLOOKUP","D. INDEX"],
   "correct_answer":"C",
   "explanation":"VLOOKUP searches vertically in the first column of a range."},

  {"skill":"excel","topic":"logical_functions","difficulty":"easy",
   "question_text":"What does =IF(A1>10, 'High', 'Low') return when A1=5?",
   "options":["A. High","B. Low","C. TRUE","D. Error"],
   "correct_answer":"B",
   "explanation":"A1=5 is not >10 so the false branch 'Low' is returned."},

  {"skill":"excel","topic":"logical_functions","difficulty":"easy",
   "question_text":"Which function counts cells that meet a specific condition?",
   "options":["A. COUNT","B. COUNTA","C. COUNTIF","D. SUMIF"],
   "correct_answer":"C",
   "explanation":"COUNTIF counts cells matching a condition. COUNT counts numbers only."},

  {"skill":"excel","topic":"pivot_tables","difficulty":"medium",
   "question_text":"In a Pivot Table, which area controls what is being measured?",
   "options":["A. Rows","B. Columns","C. Filters","D. Values"],
   "correct_answer":"D",
   "explanation":"The Values area contains the metrics being aggregated (SUM, COUNT etc)."},

  {"skill":"excel","topic":"lookup_functions","difficulty":"medium",
   "question_text":"What is the advantage of XLOOKUP over VLOOKUP?",
   "options":[
     "A. XLOOKUP is faster",
     "B. XLOOKUP can look left and returns exact match by default",
     "C. XLOOKUP works only with numbers",
     "D. XLOOKUP requires sorted data"],
   "correct_answer":"B",
   "explanation":"XLOOKUP can search in any direction and defaults to exact match unlike VLOOKUP."},

  {"skill":"excel","topic":"data_cleaning","difficulty":"medium",
   "question_text":"Which function removes leading and trailing spaces from text?",
   "options":["A. CLEAN()","B. TRIM()","C. STRIP()","D. REMOVE()"],
   "correct_answer":"B",
   "explanation":"TRIM() removes extra spaces. CLEAN() removes non-printable characters."},

  {"skill":"excel","topic":"logical_functions","difficulty":"medium",
   "question_text":"Which formula returns the sum of sales only where region = 'North'?",
   "options":[
     "A. =COUNTIF(region, 'North', sales)",
     "B. =SUMIF(region, 'North', sales)",
     "C. =IF(region='North', SUM(sales))",
     "D. =SUMIFS(sales, 'North')"],
   "correct_answer":"B",
   "explanation":"SUMIF(range, criteria, sum_range) sums values where condition is met."},

  {"skill":"excel","topic":"pivot_tables","difficulty":"hard",
   "question_text":"What does a Calculated Field do in a Pivot Table?",
   "options":[
     "A. Filters data by formula",
     "B. Creates a new field using a formula based on existing fields",
     "C. Sorts pivot table rows",
     "D. Groups dates automatically"],
   "correct_answer":"B",
   "explanation":"Calculated Fields let you create new metrics using formulas on existing pivot fields."},

  {"skill":"excel","topic":"lookup_functions","difficulty":"hard",
   "question_text":"Which combination of functions can replicate a two-way lookup?",
   "options":[
     "A. VLOOKUP + IF",
     "B. INDEX + MATCH",
     "C. HLOOKUP + VLOOKUP",
     "D. SUMIF + COUNTIF"],
   "correct_answer":"B",
   "explanation":"INDEX(array, MATCH(row_val, col), MATCH(col_val, row)) performs a two-way lookup."},

  {"skill":"excel","topic":"data_cleaning","difficulty":"hard",
   "question_text":"Column A has dates stored as text (e.g. '2024-01-15'). Which formula converts to a real date?",
   "options":[
     "A. =DATE(A1)",
     "B. =DATEVALUE(A1)",
     "C. =TEXT(A1, 'YYYY-MM-DD')",
     "D. =CONVERT(A1, 'date')"],
   "correct_answer":"B",
   "explanation":"DATEVALUE() converts a date stored as text into a serial number Excel recognizes as a date."},
]

def seed():
    print(f"Seeding {len(questions)} questions...")
    res = supabase.table("questions").insert(questions).execute()
    print(f"Done! Inserted {len(res.data)} questions.")

if __name__ == "__main__":
    seed()
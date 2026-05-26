import csv

input_filename = "hyg_v42.csv"
output_filename = "hyg_optimizat.csv"
limita_magnitudine = 6.5

print("Se inițiază curățarea catalogului stelar...")

with open(input_filename, "r", encoding="utf-8") as f_in, \
     open(output_filename, "w", newline="", encoding="utf-8") as f_out:
    
    reader = csv.reader(f_in)
    writer = csv.writer(f_out)
    
    header = next(reader)
    writer.writerow(header)
    
    randuri_pastrate = 0
    randuri_eliminate = 0
    
    for row in reader:
        if len(row) <= 13:
            continue
        try:
            mag = float(row[13])
            if mag <= limita_magnitudine:
                writer.writerow(row)
                randuri_pastrate += 1
            else:
                randuri_eliminate += 1
        except ValueError:
            writer.writerow(row)

print(f"Curățare finalizată!")
print(f"Păstrate (<= 6.5): {randuri_pastrate}")
print(f"Eliminate: {randuri_eliminate}")

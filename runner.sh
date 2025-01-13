#!/bin/sh

echo "Enter the image name with particular tags:"
read img_name

chk=$(docker images | grep -w "$img_name" | wc -l)

if [ "$chk" -eq 0 ]; then
    echo "Image not found. Please check the image name and try again."
    exit 1
else
    echo "Image found in the local repository."
fi

echo "Now processing the Trivy scan of the image."

trivy image "$img_name" >> "${img_name}_trivy_scan.txt"

path=$(find ~ -type d -name "VE-lint" 2>/dev/null)

mkdir -p "$path/inputs"

mv "${img_name}_trivy_scan.txt" "$path/inputs"

echo "Trivy scan completed and the report is saved in the inputs folder."

echo "Are you in the Project directory where the Dockerfile is built? (yes/no)"
read ans
if [ "$ans" = "yes" ]; then
    if [ -f Dockerfile ]; then
        cp Dockerfile "$path/inputs"
        mv "$path/inputs/Dockerfile" "$path/inputs/${img_name}_Dockerfile.txt"
        echo "Dockerfile moved to the inputs folder."
    else
        echo "Dockerfile not found in the current directory."
        exit 1
    fi
else
    echo "Please let me know the path of the project directory name installed locally where Docker File is stored :"
    read proj_name 
    proj_path=$(find ~ -type d -name "$proj_name" 2>/dev/null)

    chk_2=$(ls "$proj_path" | grep -w "Dockerfile" | wc -l)
    while [ "$chk_2" -eq 0 ]; do
        echo "Dockerfile not found. Please check the path and try again."
        echo "Please let me know the path of the project directory:"
        read proj_path
        proj_path=$(find ~ -type d -name "$proj_name" 2>/dev/null)
        chk_2=$(ls "$proj_path" | grep -w "Dockerfile" | wc -l)
    done
    if [ "$chk_2" -eq 1 ]; then
        cp "$proj_path/Dockerfile" "$path/inputs/${img_name}_Dockerfile.txt"
        echo "Dockerfile moved to the inputs folder."
    else
        echo "Multiple or no Dockerfile found in the directory. Please check manually."
        exit 1
    fi
fi

echo "$img_name" >>"$path/temp.txt"

.  "$path/venv/bin/activate"
"$path/venv/bin/python" "$path/model.py"

echo  "\033[1mLint ho gaya!\033[0m"

cat "$path/outputs/${img_name}_solutions.txt"
rm "$path/temp.txt"
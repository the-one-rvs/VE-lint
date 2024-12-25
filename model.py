import os
from dotenv import load_dotenv
import google.generativeai as genai
import re

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
  system_instruction="Output should contain only suggestion and solution to the particular cve in normal text format that can be written in  .txt",
)

def find_directory(name, search_path="~"):
    search_path = os.path.expanduser(search_path)
    for root, dirs, files in os.walk(search_path):
        if name in dirs:
            return os.path.join(root, name)
    return None

path = find_directory("samadhaan")

print(f"Path: {path}")

with open(f"{path}/prompts/prompts_1.txt", "r") as prompt_file:
    prompt_content_1 = prompt_file.read()
with open(f"{path}/prompts/prompt_2.txt", "r") as prompt_file:
    prompt_content_2 = prompt_file.read()
with open(f"{path}/prompts/prompt_3.txt", "r") as prompt_file:
    prompt_content_3 = prompt_file.read()
with open(f"{path}/prompts/prompt_4.txt", "r") as prompt_file:
    prompt_content_4 = prompt_file.read()

chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [prompt_content_1],
    },
    {
      "role": "model",
      "parts": [prompt_content_2],
    },
    {
      "role": "user",
      "parts": [prompt_content_3],
    },
    {
      "role": "model",
      "parts": [prompt_content_4],
    },
  ]
)

file_path = f"{path}/temp.txt"

with open(file_path, "r") as file:
    img_name = file.read().strip()

print(f"Image name: {img_name}")

content = ""
content += "\n\n"
content += "Dockerfile:\n\n"

file_path = f"{path}/inputs/{img_name}_trivy_scan.txt"

with open(file_path, "r") as file:
    file_content = file.read()

content += file_content

content += "\n\n"
content += "Dockerfile:\n\n"

file_path = f"{path}/inputs/{img_name}_Dockerfile.txt"

with open(file_path, "r") as file:
    file_content = file.read()

content += file_content

# print(file_content)

response = chat_session.send_message(content)


file_write_path = f"{path}/outputs/{img_name}_solutions.txt"

# Open the file in write mode and write the content
with open(file_write_path, "w") as file:
    file.write(response.text)

print(f"Content written to {file_write_path}")

# print(response.text)

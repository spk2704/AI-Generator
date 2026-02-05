from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

driver = webdriver.Chrome()
driver.get("https://monkeytype.com")

time.sleep(5)

textarea = driver.find_element(By.XPATH, "//textarea[@id='wordsInput']")

raw_words_first = driver.find_element(By.ID, "words")

words_first = raw_words_first.text.split()

for word in words_first:
    textarea.send_keys(word + " ")
    time.sleep(0.3)

time.sleep(120)
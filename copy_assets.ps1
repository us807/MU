# Create directories if they do not exist
New-Item -ItemType Directory -Force -Path certificates, achievements

$srcProfile = "C:\Users\USMAN\.gemini\antigravity\brain\e545f0b1-5f1f-4afb-9ab9-60d16495eaa2\profile_photo_1781896967189.png"
$srcCert = "C:\Users\USMAN\.gemini\antigravity\brain\e545f0b1-5f1f-4afb-9ab9-60d16495eaa2\certificate_placeholder_1781896982141.png"

# Copy files
Copy-Item -Path $srcProfile -Destination "profile.jpg" -Force
Copy-Item -Path $srcCert -Destination "certificates\excel2025.jpg" -Force
Copy-Item -Path $srcCert -Destination "certificates\tally2025.jpg" -Force
Copy-Item -Path $srcCert -Destination "certificates\dca2024.jpg" -Force
Copy-Item -Path $srcCert -Destination "certificates\olevel2026.jpg" -Force
Copy-Item -Path $srcCert -Destination "certificates\ccc2026.jpg" -Force

Write-Host "Placeholder assets copied successfully!"

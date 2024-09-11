const form = document.getElementById('userDataForm');
const birthYearSelect = document.getElementById('birthYear');

// Buat opsi tahun dari 1945 hingga 2035
for (let year = 1945; year <= 2035; year++) {
    let option = document.createElement('option');
    option.value = year;
    option.text = year;
    birthYearSelect.appendChild(option);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Ambil nilai dari input
    const name = document.getElementById('name').value;
    const birthYear = document.getElementById('birthYear').value;
    
    // Pastikan nama dan tahun kelahiran diisi
    if (name && birthYear) {
        // Kirim data ke Google Sheets menggunakan fetch
        fetch('https://docs.google.com/spreadsheets/d/11YRgdizdHETHoterHa8HbsOqmrtSCxGhvRLzQCeFyU4/edit?hl=id&gid=0#gid=0', { // Ganti dengan URL web app Google Apps Script
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama: name,
                tahunKelahiran: birthYear
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Data berhasil dikirim ke Google Sheets!');
            } else {
                alert('Gagal mengirim data.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan.');
        });
    } else {
        alert('Mohon isi semua data!');
    }
});


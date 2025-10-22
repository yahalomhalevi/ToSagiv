$(document).ready(function () {
    $('#car-form').on('submit', function (e) {
        e.preventDefault();
        const carNumber = $('#car-number').val().trim();
        if (!carNumber) {
            $('#result').html('<div class="alert alert-warning">אנא הזן מספר רכב</div>');
            return;
        }

        // Loader עם אנימציית ספינר של bootstrap
        $('#result').html(`
            <div class="d-flex justify-content-center my-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">טוען...</span>
                </div>
            </div>
        `);

        const resourceId = "053ea72c-0ea2-4f6c-8fca-7896b3059a27";
        const apiUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=${resourceId}&q=${encodeURIComponent(carNumber)}`;

        $.getJSON(apiUrl, function (data) {
            try {
                if (data?.success && Array.isArray(data?.result?.records) && data.result.records.length > 0) {
                    const car = data.result.records[0]; // הראשון שנמצא
                    const output = `
                        <div class="card shadow-sm mt-4">
                            <div class="card-header bg-primary text-white fs-5 fw-bold">
                                פרטי רכב: ${car.mispar_rechev || ''}
                            </div>
                            <div class="card-body">
                                <p><strong>תיאור:</strong> ${car.tozeret_nm || ''} ${car.kinuy_mishari || ''}</p>
                                <p><strong>סוג רכב:</strong> ${car.sug_delek_nm || ''}</p>
                                <p><strong>שנת ייצור:</strong> ${car.shnat_yitzur || ''}</p>
                                <p><strong>תוקף רישיון:</strong> ${car.tokef_dt || ''}</p>
                            </div>
                        </div>
                    `;
                    $('#result').html(output);
                } else {
                    $('#result').html('<div class="alert alert-danger mt-3">לא נמצאו פרטים עבור מספר זה</div>');
                }
            } catch (err) {
                console.error('Parsing API response failed', err);
                $('#result').html('<div class="alert alert-danger mt-3">אירעה שגיאה בעיבוד התשובה</div>');
            }
        }).fail(function (jqxhr, textStatus, error) {
            console.error('API request failed', textStatus, error);
            $('#result').html('<div class="alert alert-danger mt-3">אירעה שגיאה בעת שליפת הנתונים</div>');
        });
    });
});



jQuery(document).ready(function($) {
    // Upload image
    $(document).on('click', '.upload_actor_image', function(e) { // Ganti class menjadi 'upload_actor_image'
        e.preventDefault();
        const customUploader = wp.media({
            title: 'Choose Profile Image',
            library: { type: 'image' },
            button: { text: 'Use This Image' },
        }).on('select', function() {
            const attachment = customUploader.state().get('selection').first().toJSON();
            $('#actor_profile_image').val(attachment.id); // Ganti ID menjadi 'actor_profile_image'
            $('#actor_profile_image_preview').attr('src', attachment.url).show();
            $('.remove_actor_image').removeClass('hidden');
        }).open();
    });

    // Remove image
    $(document).on('click', '.remove_actor_image', function(e) { // Ganti class menjadi 'remove_actor_image'
        e.preventDefault();
        $('#actor_profile_image').val(''); // Ganti ID menjadi 'actor_profile_image'
        $('#actor_profile_image_preview').hide();
        $(this).addClass('hidden');
    });
});
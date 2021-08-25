/**
 * @copyright MrMahir Pvt Ltd - https://mrmahir.com
 * @author Usama Naseer <unaseer932@gmail.com>
 * @since 2021-08-25
 */

export async function postImage ( file ) {
  if ( !(file instanceof File) ) {
    throw new Error ('"file" be an instance of File object');
  }

  const formData = new FormData();
  formData.append('image', file);

  return new Promise((resolve, reject) => {
    $.ajax({
        data: formData,
        type: 'POST',
        processData: false,
        contentType: false,
        url: `/file/upload`,
      })
      .done(response => resolve(response))
      .fail(e => reject(e));
  });
}

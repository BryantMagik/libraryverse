export const getBookId = (url: string) => {

    if (url.includes('flaticon')) return 'flaticon';
    url = url.replace('http://books.google.com/books/content?', '');
    let urlArray = url.split('&');
    let bookId = urlArray[0].replace('id=', '');

    return bookId;
}
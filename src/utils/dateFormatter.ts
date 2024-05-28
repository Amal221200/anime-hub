export default function dateFormatter(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        dateStyle: 'long'
    }

    const { format } = new Intl.DateTimeFormat('en-UK', options);

    return format(date)
}
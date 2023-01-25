export class Constants {
    public static URL_LOCALHOST_ADVERTISEMENT   = 'http://127.0.0.1:4000/api/v1/advertisements/';
    public static URL_LOCALHOST_FILEMANAGER     = 'http://127.0.0.1:5000/api/v1/filemanager/';
    public static URL_LOCALHOST_CONFIGURATION   = 'http://127.0.0.1:4000/api/v1/configurations/';
    public static END_POINT_SEARCH_ALL          = 'search-all';
    public static END_POINT_DELETE              = 'delete-by-id';
    public static END_POINT_SAVE                = 'save';
    public static END_POINT_UPDATE              = 'update/';
    public static END_POINT_INACTIVE            = 'inactive';
    public static END_POINT_UPLOAD              = 'upload/';
    public static END_POINT_DOWNLOAD            = 'download/';
    public static END_POINT_INFO                = 'info';

    // Regex
    public static REGEX_DATE_TIME               = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})(\s)([0-1][0-9]|2[0-3])(:)([0-5][0-9])$/;
}
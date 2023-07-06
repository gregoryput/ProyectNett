namespace ProyectNettApi.Models
{
    public class Respuesta
    {
        public bool IsSuccess { get; set; } = true;
        public string DisplayMessage { get; set; }
        public object Result { get; set; }
        public List<string> ErrorMessages { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
    }
}

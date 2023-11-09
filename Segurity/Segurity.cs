using System;
using System.Security.Cryptography;

namespace ProyectNettApi.Segurity
{
    public class Segurity
    {
        public static string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] passwordBytes = System.Text.Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha256.ComputeHash(passwordBytes);
                string hashedPassword = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                return hashedPassword;
            }
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            string newHashedPassword = HashPassword(password);
            return newHashedPassword == hashedPassword;
        }
    }
}


project "spirv_cross"
	kind "StaticLib"
	language "C++"
	staticruntime "off"

	targetdir ("bin/" .. outputdir .. "/%{prj.name}")
	objdir ("bin-int/" .. outputdir .. "/%{prj.name}")

	files
	{
        "GLSL.std.450.h",
        "spirv.h",
        "spirv.hpp",
        "spirv_cfg.hpp",
        "spirv_cfg.cpp",
        "spirv_cross.cpp",
        "spirv_cross.hpp",
        "spirv_common.hpp",
        "spirv_cpp.hpp",
        "spirv_cpp.cpp",
        "spirv_glsl.hpp",
        "spirv_glsl.cpp",
        "spirv_parser.hpp",
        "spirv_parser.cpp",
        "spirv_reflect.hpp",
        "spirv_reflect.cpp",
	}

	filter "configurations:Debug"
		runtime "Debug"
		symbols "on"

	filter "configurations:Release"
		runtime "Release"
		optimize "on"
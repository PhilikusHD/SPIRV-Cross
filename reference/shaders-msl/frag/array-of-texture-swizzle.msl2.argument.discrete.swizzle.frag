#pragma clang diagnostic ignored "-Wmissing-prototypes"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

enum class spvSwizzle : uint
{
    none = 0,
    zero,
    one,
    red,
    green,
    blue,
    alpha
};

template<typename T>
inline T spvGetSwizzle(vec<T, 4> x, T c, spvSwizzle s)
{
    switch (s)
    {
        case spvSwizzle::none:
            return c;
        case spvSwizzle::zero:
            return 0;
        case spvSwizzle::one:
            return 1;
        case spvSwizzle::red:
            return x.r;
        case spvSwizzle::green:
            return x.g;
        case spvSwizzle::blue:
            return x.b;
        case spvSwizzle::alpha:
            return x.a;
    }
}

// Wrapper function that swizzles texture samples and fetches.
template<typename T>
inline vec<T, 4> spvTextureSwizzle(vec<T, 4> x, uint s)
{
    if (!s)
        return x;
    return vec<T, 4>(spvGetSwizzle(x, x.r, spvSwizzle((s >> 0) & 0xFF)), spvGetSwizzle(x, x.g, spvSwizzle((s >> 8) & 0xFF)), spvGetSwizzle(x, x.b, spvSwizzle((s >> 16) & 0xFF)), spvGetSwizzle(x, x.a, spvSwizzle((s >> 24) & 0xFF)));
}

template<typename T>
inline T spvTextureSwizzle(T x, uint s)
{
    return spvTextureSwizzle(vec<T, 4>(x, 0, 0, 1), s).x;
}

struct spvDescriptorSetBuffer0
{
    array<texture2d<float>, 4> uSampler0 [[id(0)]];
    array<sampler, 4> uSampler0Smplr [[id(4)]];
    constant uint* spvSwizzleConstants [[id(8)]];
};

struct main0_out
{
    float4 FragColor [[color(0)]];
};

struct main0_in
{
    float2 vUV [[user(locn0)]];
};

static inline __attribute__((always_inline))
float4 sample_in_func_1(constant array<texture2d<float>, 4>& uSampler0, constant array<sampler, 4>& uSampler0Smplr, constant uint* uSampler0Swzl, thread float2& vUV)
{
    return spvTextureSwizzle(uSampler0[2].sample(uSampler0Smplr[2], vUV), uSampler0Swzl[2]);
}

static inline __attribute__((always_inline))
float4 sample_in_func_2(thread float2& vUV, texture2d<float> uSampler1, sampler uSampler1Smplr, constant uint& uSampler1Swzl)
{
    return spvTextureSwizzle(uSampler1.sample(uSampler1Smplr, vUV), uSampler1Swzl);
}

static inline __attribute__((always_inline))
float4 sample_single_in_func(texture2d<float> s, sampler sSmplr, constant uint& sSwzl, thread float2& vUV)
{
    return spvTextureSwizzle(s.sample(sSmplr, vUV), sSwzl);
}

fragment main0_out main0(main0_in in [[stage_in]], constant spvDescriptorSetBuffer0& spvDescriptorSet0 [[buffer(0)]], constant uint* spvSwizzleConstants [[buffer(30)]], texture2d<float> uSampler1 [[texture(0)]], sampler uSampler1Smplr [[sampler(0)]])
{
    main0_out out = {};
    constant uint* spvDescriptorSet0_uSampler0Swzl = &spvDescriptorSet0.spvSwizzleConstants[0];
    constant uint& uSampler1Swzl = spvSwizzleConstants[0];
    out.FragColor = sample_in_func_1(spvDescriptorSet0.uSampler0, spvDescriptorSet0.uSampler0Smplr, spvDescriptorSet0_uSampler0Swzl, in.vUV);
    out.FragColor += sample_in_func_2(in.vUV, uSampler1, uSampler1Smplr, uSampler1Swzl);
    out.FragColor += sample_single_in_func(spvDescriptorSet0.uSampler0[1], spvDescriptorSet0.uSampler0Smplr[1], spvDescriptorSet0_uSampler0Swzl[1], in.vUV);
    out.FragColor += sample_single_in_func(uSampler1, uSampler1Smplr, uSampler1Swzl, in.vUV);
    return out;
}

